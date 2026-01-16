import type { Theme } from './types';

export const dark: Theme = {
    mode: 'dark',
    palette: {
        background: {
            main: '#1d1d1d',
            contrast: '#ffffff',
            light: '#282828',
            dark: '#000000',
        },
        text: {
            main: '#ffffff',
            contrast: '#1d1d1d',
            light: '#b9b9b9ff',
            dark: '#e3e4e2',
        },
        primary: {
            main: '#cd1c0b',
            contrast: '#ffffff',
            light: '#ff1111',
            dark: '#7d180f',
        },
        secondary: {
            main: '#cccccc',
            contrast: '#1d1d1d',
            light: '#e3e4e2',
            dark: '#909090',
        },
        graph: {
            colors: [
                '#ffd2cc', // very light
                '#ffb3a7',
                '#ff8f6e',
                '#ff6a3b',
                '#ff3e2a',
                '#cd1c0b', // primary center
                '#a01208',
                '#7d0f06',
                '#4e0703',
                '#2b0301',
            ],
        },
    },
};

export const light: Theme = {
    mode: 'light',
    palette: {
        background: {
            main: '#ffffff',
            contrast: '#1d1d1d',
            light: '#b1b1b1ff',
            dark: '#dbdbdb',
        },
        text: {
            main: '#1d1d1d',
            contrast: '#ffffff',
            light: '#434343',
            dark: '#000000',
        },
        primary: {
            main: '#cd1c0b',
            contrast: '#ffffff',
            light: '#ff1111',
            dark: '#7d180f',
        },
        secondary: {
            main: '#5e5e5e',
            contrast: '#ffffff',
            light: '#909090',
            dark: '#434343',
        },
        graph: {
            colors: [
                '#fff0ef', // very light
                '#ffd2cc',
                '#ffb3a7',
                '#ff8f6e',
                '#ff6a3b',
                '#cd1c0b', // primary center
                '#a01208',
                '#7d0f06',
                '#4e0703',
                '#2b0301',
            ],
        },
    },
};
