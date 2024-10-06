const SendImage = async (data, api, loading, csrf) => {
    loading()
    try {
        const response = await fetch(api, {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Request failed:', errorText);
            throw new Error('Request failed');
        }

        return await response.json();
    } catch (error) {
        throw new Error('Failed to send data: ' + error.message);
    }
}

export default SendImage;