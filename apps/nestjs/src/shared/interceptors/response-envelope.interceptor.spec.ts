import { of } from 'rxjs';

import { ResponseEnvelopeInterceptor } from './response-envelope.interceptor';

describe('ResponseEnvelopeInterceptor', () => {
  const interceptor = new ResponseEnvelopeInterceptor();
  const next = { handle: () => of(undefined) };

  it('passes through undefined', (done) => {
    interceptor.intercept({} as never, next).subscribe((value) => {
      expect(value).toBeUndefined();
      done();
    });
  });

  it('wraps plain values', (done) => {
    interceptor
      .intercept({} as never, { handle: () => of('hello') })
      .subscribe((body) => {
        expect(body).toEqual({ data: 'hello', meta: {} });
        done();
      });
  });

  it('normalizes explicit envelopes with missing meta', (done) => {
    interceptor
      .intercept({} as never, { handle: () => of({ data: 1 }) })
      .subscribe((body) => {
        expect(body).toEqual({ data: 1, meta: {} });
        done();
      });
  });
});
