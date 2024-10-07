import pRetry, { type Options as PRetryOptions } from 'p-retry';
import { afterEach, describe, expect, expectTypeOf, it, vi } from 'vitest';

import { wrappedPRetry } from '../src/utils';

vi.mock(import('p-retry'), () => {
	return {
		default: vi.fn(),
	};
});
(pRetry as any).id = crypto.randomUUID();

describe('util', () => {
	describe('wrappedPRetry', () => {
		afterEach(() => {
			vi.resetAllMocks();
		});

		it('correctly calls p-retry with the same parameters', async () => {
			console.log('test          mocked pRetry:', (pRetry as any).id);

			const resultValue = 'test-result';
			const retryFunction = (): string => resultValue;
			const retryOpts: PRetryOptions = {
				retries: 5,
			};

			// Act
			await wrappedPRetry(retryFunction, retryOpts);

			// Assert
			expect(vi.mocked(pRetry)).toBeCalledWith(retryFunction, retryOpts);
		});
	});
});
