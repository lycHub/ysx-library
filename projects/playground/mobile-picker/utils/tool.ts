import { TabPanel } from 'mdui';
export function renderCode(codeMap: Record<string, string>) {
  const tabContents = document.querySelectorAll(
    '.demo-code-content'
  ) as NodeListOf<TabPanel>;
  tabContents.forEach((tabContent) => {
    const codeContent = codeMap[tabContent.value as keyof typeof codeMap];
    tabContent.querySelector('pre code')!.textContent = codeContent;

    const copyBtn = tabContent.querySelector('.demo-code-copy');
    copyBtn?.addEventListener('click', async () => {
      // console.log('copyBtn>>>', tabContent.value);
      try {
        await navigator.clipboard.writeText(codeContent);
      } catch (error) {
        console.error('Failed to copy code: ', error);
        alert('Failed to copy code. Please try again.');
      }
    });
  });
}
