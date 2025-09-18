export class SupabaseTable<T extends Record<string, any>> {
    private apiUrl: string;
    private apiKey: string;

    constructor(
        private tableName: string,
        apiUrl: string,
        apiKey: string
    ) {
        this.apiUrl = `${apiUrl}/rest/v1/${tableName}`;
        this.apiKey = apiKey;
    }

    public async get_data(): Promise<T[]> {
        try {
            const query = `${this.apiUrl}?select=*&order=created_at.desc`;

            const res = await fetch(query, {
                headers: {
                    apikey: this.apiKey,
                    Authorization: `Bearer ${this.apiKey}`,
                },
            });

            if (!res.ok) {
                throw new Error(`HTTP error: ${res.status} ${res.statusText}`);
            }

            return await res.json();
        } catch (error) {
            console.error(`Error fetching ${this.tableName} data:`, error);
            throw error;
        }
    }

    public async add_row(row: T): Promise<T[]> {
        try {
            const res = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    apikey: this.apiKey,
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    Prefer: 'return=representation',
                },
                body: JSON.stringify(row),
            });

            if (!res.ok) {
                throw new Error(`Insert failed: ${res.status} ${res.statusText}`);
            }

            return await res.json();
        } catch (error) {
            console.error(`Error inserting into ${this.tableName}:`, error);
            throw error;
        }
    }

    public async delete_by_id(id: string): Promise<T[]> {
        try {
            const query = `${this.apiUrl}?id=eq.${encodeURIComponent(id)}`;

            const res = await fetch(query, {
                method: 'DELETE',
                headers: {
                    apikey: this.apiKey,
                    Authorization: `Bearer ${this.apiKey}`,
                    Prefer: 'return=representation',
                },
            });

            if (!res.ok) {
                throw new Error(`Delete failed: ${res.status} ${res.statusText}`);
            }

            return await res.json();
        } catch (error) {
            console.error(`Error deleting from ${this.tableName}:`, error);
            throw error;
        }
    }

    public async update_by_id(id: string, updates: Partial<T>): Promise<T[]> {
        try {
            const query = `${this.apiUrl}?id=eq.${encodeURIComponent(id)}`;

            const res = await fetch(query, {
                method: 'PATCH',
                headers: {
                    apikey: this.apiKey,
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    Prefer: 'return=representation',
                },
                body: JSON.stringify(updates),
            });

            if (!res.ok) {
                throw new Error(`Update failed: ${res.status} ${res.statusText}`);
            }

            return await res.json();
        } catch (error) {
            console.error(`Error updating ${this.tableName}:`, error);
            throw error;
        }
    }
}
