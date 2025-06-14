// export interface Data {
//     id: number;
//     issueType: string;
//     severity: string;
//     component: string;
//     selector: string;
//     url: string;
//     description?: string;
//     codeSnippet?: string;
//     screenshot?: string;
// }

export type Data = {
  id: number;
  issueType: string;
  severity: string;
  component: string;
  description: string;
  selector: string;
  url: string;
  codeSnippet?: string;
  screenshot?: string;
};

export const data: Data[] = [
  {
    id: 0,
    issueType: 'Interactable Role',
    severity: 'Critical',
    component: 'ABC',
    selector: '.foo > #bar',
    url: 'https://www.zzzz.co.uk',
    description: 'The button is not keyboard accessible.',
    codeSnippet: '<button>Click me</button>',
    screenshot: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    issueType: 'Accessible Name',
    severity: 'Critical',
    component: 'AAA',
    selector: '.foo#bing > #bar',
    url: 'https://www.zzzz.co.uk',
    description: 'Image button lacks accessible name.',
    codeSnippet: "<img src='image.png' alt=''>",
    screenshot: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    issueType: 'Interactable Role',
    severity: 'Minor',
    component: 'ABC',
    selector: '.some.class',
    url: 'https://www.aaa.co.uk',
    description: 'Role is not explicitly defined.',
    codeSnippet: "<div role='button'>Press</div>",
    screenshot: 'https://via.placeholder.com/150',
  },
  {
    id: 16,
    issueType: 'Keyboard Accessible',
    severity: 'Critical',
    component: 'ZZZ',
    selector: '#zooooom',
    url: 'https://www.zzzz.co.uk',
    description: 'Element is not focusable.',
    codeSnippet: '<div>Not keyboard accessible</div>',
    screenshot: 'https://via.placeholder.com/150',
  },
  {
    id: 8,
    issueType: 'Keyboard Accessible',
    severity: 'Minor',
    component: 'ABC',
    selector: '.vroooomo',
    url: 'https://www.fff.co.uk',
    description: 'Missing tabindex on a non-interactive element.',
    codeSnippet: "<div tabindex='0'>Focusable</div>",
    screenshot: 'https://via.placeholder.com/150',
  },
];
