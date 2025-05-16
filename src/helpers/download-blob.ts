export const downloadBlob = (blob: Blob, fileName: string) => {
  console.log('downloadBlob', blob);
  const url = window.URL.createObjectURL(blob);

  console.log(url);

  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.style.display = 'none';

  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};
