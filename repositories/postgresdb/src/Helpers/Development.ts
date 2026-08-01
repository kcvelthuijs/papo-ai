export function isDevelopment(): boolean {
  const devEnvParam = process.env.ISDEV ?? '';
  console.log(
    'Developmend mode: ',
    devEnvParam.length > 0 ? 'ON' : 'OFF',
    `"${devEnvParam}"`,
  );

  return devEnvParam.length > 0;
}
