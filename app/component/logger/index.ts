
export default function logger(...args: any) {
  if (process.env.NODE_ENV !== 'development') return;
  console.log.apply(this, args);
}
