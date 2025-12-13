import { useState, useEffect, useCallback } from "react";

export interface SOSRecord {
  id?: number;
  message: string;
  location: { lat: number; lng: number } | null;
  timestamp: number;
  status: "pending" | "sent" | "synced";
  severity: "low" | "medium" | "high" | "critical";
  bluetoothEnabled: boolean;
  accuracy?: number | null;
}

const DB_NAME = "ResQLinkDB";
const DB_VERSION = 1;
const STORE_NAME = "sos_alerts";

export function useSOSDatabase() {
  const [db, setDb] = useState<IDBDatabase | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize IndexedDB
  useEffect(() => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      setError("Failed to open database");
      console.error("IndexedDB error:", request.error);
    };

    request.onsuccess = () => {
      setDb(request.result);
      setIsReady(true);
      console.log("IndexedDB initialized successfully");
    };

    request.onupgradeneeded = (event) => {
      const database = (event.target as IDBOpenDBRequest).result;
      
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        const store = database.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
        
        store.createIndex("status", "status", { unique: false });
        store.createIndex("timestamp", "timestamp", { unique: false });
        store.createIndex("severity", "severity", { unique: false });
        
        console.log("IndexedDB store created");
      }
    };

    return () => {
      if (db) {
        db.close();
      }
    };
  }, []);

  // Save SOS record
  const saveSOS = useCallback(
    async (record: Omit<SOSRecord, "id">): Promise<number> => {
      return new Promise((resolve, reject) => {
        if (!db) {
          reject(new Error("Database not initialized"));
          return;
        }

        const transaction = db.transaction([STORE_NAME], "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.add(record);

        request.onsuccess = () => {
          console.log("SOS saved to IndexedDB:", request.result);
          resolve(request.result as number);
        };

        request.onerror = () => {
          console.error("Failed to save SOS:", request.error);
          reject(request.error);
        };
      });
    },
    [db]
  );

  // Get all SOS records
  const getAllSOS = useCallback(async (): Promise<SOSRecord[]> => {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject(new Error("Database not initialized"));
        return;
      }

      const transaction = db.transaction([STORE_NAME], "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }, [db]);

  // Get pending SOS records (for sync)
  const getPendingSOS = useCallback(async (): Promise<SOSRecord[]> => {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject(new Error("Database not initialized"));
        return;
      }

      const transaction = db.transaction([STORE_NAME], "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const index = store.index("status");
      const request = index.getAll("pending");

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }, [db]);

  // Update SOS status
  const updateSOSStatus = useCallback(
    async (id: number, status: SOSRecord["status"]): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (!db) {
          reject(new Error("Database not initialized"));
          return;
        }

        const transaction = db.transaction([STORE_NAME], "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        const getRequest = store.get(id);

        getRequest.onsuccess = () => {
          const record = getRequest.result;
          if (record) {
            record.status = status;
            const putRequest = store.put(record);
            putRequest.onsuccess = () => resolve();
            putRequest.onerror = () => reject(putRequest.error);
          } else {
            reject(new Error("Record not found"));
          }
        };

        getRequest.onerror = () => reject(getRequest.error);
      });
    },
    [db]
  );

  return {
    isReady,
    error,
    saveSOS,
    getAllSOS,
    getPendingSOS,
    updateSOSStatus,
  };
}
