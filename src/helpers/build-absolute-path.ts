export type BasePath = `/${string}/` | '/';

export const buildAbsolutePath = (path: string): string => {
  let basePath = import.meta.env.VITE_BASE_PATH;
  basePath ||= '/';
  basePath = basePath.endsWith('/') ? basePath : `${basePath}/`;
  basePath = basePath.startsWith('/') ? basePath : `/${basePath}`;

  const pathToAppend = path.startsWith('/') ? path.substring(1) : path;

  return `${basePath}${pathToAppend}`;
};
