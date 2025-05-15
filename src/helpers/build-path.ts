export type BasePath = `/${string}/` | '/';

export const buildPath = (path: string, trimLeadingSlash?: boolean): string => {
  let basePath = import.meta.env.VITE_BASE_PATH;
  basePath ||= '/';
  basePath = basePath.endsWith('/') ? basePath : `${basePath}/`;
  basePath = basePath.startsWith('/') ? basePath : `/${basePath}`;

  const pathToAppend = path.startsWith('/') ? path.substring(1) : path;

  let pathToReturn = `${basePath}${pathToAppend}`;
  if (trimLeadingSlash) {
    pathToReturn = pathToReturn.startsWith('/') ? pathToReturn.substring(1) : pathToReturn;
  }

  return pathToReturn;
};
