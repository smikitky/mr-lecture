declare module 'fft-js' {
  export function fft(
    vector: (number | [number, number])[]
  ): [number, number][];
}
