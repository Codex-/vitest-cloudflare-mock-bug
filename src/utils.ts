import pRetry from 'p-retry';

type RetryParams<T> = Parameters<typeof pRetry<T>>;

export async function wrappedPRetry<T>(...params: RetryParams<T>) {
	console.log('retryToResult mocked pRetry:', (pRetry as any).id);

	return pRetry(...params);
}
