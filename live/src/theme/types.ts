export interface Theme {
    mode: 'light' | 'dark';
    palette: ThemePalette;
}

export interface ThemePalette {
    background: ThemePaletteOptions;
    text: ThemePaletteOptions;
    primary: ThemePaletteOptions;
    secondary: ThemePaletteOptions;
    graph: GraphPalette;
}

export interface ThemePaletteOptions {
    main: string;
    contrast: string;
    light: string;
    dark: string;
}

/**
 * 10 distinct colors for timeline graph branches
 * Index 0-9 maps to colorIndex in TimelineEvent
 */
export interface GraphPalette {
    colors: [string, string, string, string, string, string, string, string, string, string];
}