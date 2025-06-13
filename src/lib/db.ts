import { Article } from "./api";

interface PayoutRate {
  type: string;
  rate: number;
}

class NewsDB {
  private db: IDBDatabase | null = null;
  private readonly dbName = "news-dashboard";
  private readonly version = 1;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);

      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create object stores
        if (!db.objectStoreNames.contains("articles")) {
          db.createObjectStore("articles", { keyPath: "url" });
        }

        if (!db.objectStoreNames.contains("payoutRates")) {
          db.createObjectStore("payoutRates", { keyPath: "type" });
        }
      };
    });
  }

  async saveArticles(articles: Article[]): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction("articles", "readwrite");
      const store = transaction.objectStore("articles");

      articles.forEach((article) => {
        store.put(article);
      });

      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }

  async getArticles(): Promise<Article[]> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction("articles", "readonly");
      const store = transaction.objectStore("articles");
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async savePayoutRates(rates: PayoutRate[]): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction("payoutRates", "readwrite");
      const store = transaction.objectStore("payoutRates");

      rates.forEach((rate) => {
        store.put(rate);
      });

      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }

  async getPayoutRates(): Promise<PayoutRate[]> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction("payoutRates", "readonly");
      const store = transaction.objectStore("payoutRates");
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
}

export const db = new NewsDB(); 