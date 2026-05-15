import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  StreamableFile,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import type { ApiSuccessBody } from '../http/api-response';

function isEnvelope(value: unknown): value is Partial<ApiSuccessBody<unknown>> {
  return (
    value !== null &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    Object.prototype.hasOwnProperty.call(value, 'data')
  );
}

/**
 * Normalizes successful JSON responses to `{ data, meta }` so controllers can return
 * either a bare value or an explicit envelope. Skips `undefined` (e.g. 204), streams, and buffers.
 */
@Injectable()
export class ResponseEnvelopeInterceptor implements NestInterceptor {
  intercept(_ctx: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((payload: unknown) => {
        if (payload === undefined) {
          return undefined;
        }
        if (payload instanceof StreamableFile) {
          return payload;
        }
        if (Buffer.isBuffer(payload)) {
          return payload;
        }
        if (isEnvelope(payload)) {
          const m = payload.meta;
          const meta =
            m !== undefined &&
            m !== null &&
            typeof m === 'object' &&
            !Array.isArray(m)
              ? { ...m }
              : {};
          return {
            data: payload.data,
            meta,
          };
        }
        return { data: payload, meta: {} };
      }),
    );
  }
}
