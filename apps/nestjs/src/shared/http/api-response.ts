/**
 * Standard successful API payload. Controllers may return this shape explicitly
 * or return a bare value and let {@link ResponseEnvelopeInterceptor} wrap it.
 */
export type ApiSuccessBody<T> = {
  data: T;
  meta: Record<string, unknown>;
};

/** Build a typed success body (optional when the global envelope interceptor wraps bare values). */
export function apiSuccess<T>(
  data: T,
  meta: Record<string, unknown> = {},
): ApiSuccessBody<T> {
  return { data, meta };
}

/** List endpoints: consistent pagination meta alongside `data`. */
export function apiPaginated<T>(
  items: T[],
  params: { total: number; offset: number; limit: number },
): ApiSuccessBody<T[]> {
  return {
    data: items,
    meta: {
      count: params.total,
      offset: params.offset,
      limit: params.limit,
    },
  };
}
