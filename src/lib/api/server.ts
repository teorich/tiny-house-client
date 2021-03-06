interface Body<TVariables> {
  query: string;
  variables?: TVariables;
}

interface Error {
  message: string;
}

export const server = {
  fetch: async <Tdata = any, TVariables = any>(body: Body<TVariables>) => {
    const res = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error('failed to fetch from server');
    }

    return res.json() as Promise<{ data: Tdata; errors: Error[] }>;
  },
};
