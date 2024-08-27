/**
 * API呼び出しの共通処理
 * @param req
 * @param opts
 * @returns
 */
export function api(req: any, opts: any) {
  const config = useRuntimeConfig();
  console.log(config.public.baseURL);
  return useFetch(req, { baseURL: config.public.baseURL, ...opts });
}
