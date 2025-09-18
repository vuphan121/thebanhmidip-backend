export class SupabaseBucket {
    private apiUrl: string;

    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }

    public async fetchImage(bucket: string, path: string, apiKey: string): Promise<Blob> {
        const url = `${this.apiUrl}/storage/v1/object/${bucket}/${path}`;

        const res = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                apikey: apiKey,
            },
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Fetch failed: ${res.status} - ${errorText}`);
        }

        return await res.blob();
    }
}


