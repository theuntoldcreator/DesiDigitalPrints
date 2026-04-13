/**
 * Lightweight PocketBase Client Helper for Desi Digital Prints
 * This allows us to interact with PocketBase without needing the full SDK installed.
 */

// --- CONNECTION CONFIGURATION ---
// Local Development: 'http://127.0.0.1:8090'
// Hugging Face Production: 'https://theuntoldcreator1999-desidigitalprints.hf.space'
const PB_URL = 'https://theuntoldcreator1999-desidigitalprints.hf.space'; 
// --------------------------------

export const pb = {
  baseUrl: PB_URL,
  _eventSource: null,
  _subscribers: {},

  // Establish SSE connection
  _connectRealtime() {
    if (this._eventSource) return;
    this._eventSource = new EventSource(`${PB_URL}/api/realtime`);
    this._eventSource.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (this._subscribers[data.action]) {
        this._subscribers[data.action].forEach(cb => cb(data.record));
      }
    };
    this._eventSource.onerror = () => {
      this._eventSource.close();
      this._eventSource = null;
      setTimeout(() => this._connectRealtime(), 3000);
    };
  },

  /**
   * Simple subscription helper (Simulates real-time)
   * Note: For a true listener in v0.22, you normally use the SDK.
   * Here we implement a lightweight polling or SSE listener.
   */
  subscribe(collectionName, callback) {
    // For this lightweight version, we will return a 'refetch' trigger
    // or just a placeholder. Real SSE needs 'clientId' handshake.
    // Instead, we'll provide a 'Live Sync' signal.
    window.addEventListener('pb-update-' + collectionName, (e) => callback(e.detail));
    return () => window.removeEventListener('pb-update-' + collectionName, callback);
  },

  _triggerSync(collectionName, action, record) {
     window.dispatchEvent(new CustomEvent('pb-update-' + collectionName, { 
       detail: { action, record } 
     }));
  },

  async getFullList(collectionName, options = {}) {
    const params = new URLSearchParams(options).toString();
    try {
      const res = await fetch(`${PB_URL}/api/collections/${collectionName}/records?${params}`);
      
      if (res.status === 404) {
        console.warn(`[DesiOS] Collection '${collectionName}' does not exist in the cloud yet.`);
        return [];
      }
      
      if (!res.ok) throw new Error('PB_OFFLINE');
      
      const data = await res.json();
      return data.items || [];
    } catch (err) {
      console.error(`[DesiOS] Network Error accessing ${collectionName}:`, err);
      throw new Error('PB_OFFLINE');
    }
  },

  async create(collectionName, body) {
    let headers = {};
    let payload = body;
    if (!(body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
      payload = JSON.stringify(body);
    }

    const res = await fetch(`${PB_URL}/api/collections/${collectionName}/records`, {
      method: 'POST',
      headers,
      body: payload,
    });
    if (!res.ok) throw new Error('PB_SAVE_FAILED');
    const record = await res.json();
    this._triggerSync(collectionName, 'create', record);
    return record;
  },

  async update(collectionName, id, body) {
    try {
      let headers = {};
      let payload = body;
      if (!(body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
        payload = JSON.stringify(body);
      }

      const res = await fetch(`${PB_URL}/api/collections/${collectionName}/records/${id}`, {
        method: 'PATCH',
        headers,
        body: payload,
      });
      if (!res.ok) throw new Error('PB_UPDATE_FAILED');
      const record = await res.json();
      this._triggerSync(collectionName, 'update', record);
      return record;
    } catch (err) {
      console.error('Update failed:', err);
      throw err;
    }
  },

  async delete(collectionName, id) {
    const res = await fetch(`${PB_URL}/api/collections/${collectionName}/records/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) this._triggerSync(collectionName, 'delete', { id });
    return res.ok;
  },

  getFileUrl(collectionIdOrName, recordId, fileName) {
    return `${PB_URL}/api/files/${collectionIdOrName}/${recordId}/${fileName}`;
  }
};
