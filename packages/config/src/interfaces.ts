export type BuildMode = 'development' | 'production';

export interface BuildPaths {
  entry: string;
  html: string;
  public: string;
  output: string;
  srcAlias: string;
}

export interface BuildOptions {
  paths: BuildPaths;
  mode?: BuildMode;
  port?: number;
  analyze?: boolean;
  define?: { [k: string]: string };
}

export interface FullBuildOptions extends BuildOptions {
  isDevMode: boolean;
  isProdMode: boolean;
}

export interface CommandsEnvVariables {
  mode?: 'development' | 'production';
  port?: number;
  analyze?: boolean;
}
