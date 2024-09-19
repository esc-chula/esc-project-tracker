export default function truncateTextByBytes(text: string, byteLength: number) {
  const enc = new TextEncoder();
  const dec = new TextDecoder('utf-8');

  const uint8 = enc.encode(text);
  const section = uint8.slice(0, byteLength);

  let decoded = dec.decode(section);
  if (decoded.slice(-1) === '�') decoded = decoded.slice(0, -1);

  return decoded;
}
