import { MenuItemList } from './data';
import './index.scss';
import 'mdui';
import '@mdui/icons/menu';
import '@mdui/icons/light-mode';
import '@mdui/icons/dark-mode';
import '@mdui/icons/settings-system-daydream';
import '@mdui/icons/menu-open';
import '@mdui/icons/near-me';
import '@mdui/icons/arrow-drop-down';
import '@mdui/icons/layers';
import '@mdui/icons/functions';
import '@mdui/icons/subject';

import type { Collapse, CollapseItem, NavigationDrawer, CollapseEventMap, ListItem } from 'mdui';
import { ValueOrNull } from '@ysx-libs/mobile-picker';
import { breakpoint, observeResize } from 'mdui';
import { StorageKeys } from '../utils/consts';


const dropDown = document.getElementById('theme-dropdown');
const dropDownTrigger = dropDown?.querySelector('.theme-dropdown-trigger');
const dropDownMenu = dropDown?.querySelector('.theme-dropdown-menu');

let currentTheme = '';


const iframe = document.getElementsByName('frame')[0] as HTMLIFrameElement;
iframe.onload = () => {
  changeTheme(localStorage.getItem('picker-theme') || '');
}

if (dropDownMenu) {
  dropDownMenu.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const { theme } = target.dataset;
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        changeTheme(theme);
      });
    } else {
      changeTheme(theme);
    }
  });
}

function changeTheme(theme?: string) {
  currentTheme = theme || 'auto';
  document.documentElement.className = `mdui-theme-${currentTheme}`;
  localStorage.setItem('picker-theme', currentTheme);

  changeIframeTheme();

  if (dropDownTrigger) {
    let triggerStr = '';
    switch (currentTheme) {
      case 'dark':
        triggerStr = '<mdui-icon-dark-mode class="ico ico-dark"  />';
        break;
      case 'auto':
        triggerStr = '<mdui-icon-settings-system-daydream class="ico ico-auto"  />';
        break;
      default:
        triggerStr = '<mdui-icon-light-mode class="ico ico-light"  />';
        break;
    }
    dropDownTrigger.innerHTML = triggerStr;
  }
}

function changeIframeTheme() {
  if (iframe?.contentDocument) {
    iframe.contentDocument.documentElement.className = `mdui-theme-${currentTheme}`;
  }
}

let isOverLg = breakpoint().up('lg');
const menuIcon = document.querySelector('.ico-menu');
const closeIcon = document.querySelector('.ico-close');
const drawerNode: ValueOrNull<NavigationDrawer> = document.querySelector('.aside-drawer');


const asideMenus = document.querySelectorAll('.aside-menu') as NodeListOf<HTMLElement>;
let currentActiveMenuMeta = {
  parent: '',
  value: '',
};

currentActiveMenuMeta = MenuItemList[0];
const sessionItem = sessionStorage.getItem(StorageKeys.menuItem);
if (sessionItem) {
  const { parent, value } = JSON.parse(sessionItem);
  const data = MenuItemList.find((item) => item.value === value);
  if (data) {
    currentActiveMenuMeta = { parent, value };
  }
}
const data = MenuItemList.find((item) => item.value === currentActiveMenuMeta.value)!;
iframe.src = `../pages/${data.path}/`;


let currentAsideMenu: ValueOrNull<HTMLElement> = null;
let collapsed: ValueOrNull<Collapse> = null;

if (menuIcon && drawerNode && closeIcon) {
  menuIcon.addEventListener('click', () => {
    drawerNode.open = true;
    if (collapsed) {
      collapsed.value = currentActiveMenuMeta.parent;
      changeCollapseItemStates(collapsed);
    }
  });
  closeIcon.addEventListener('click', () => {
    drawerNode.open = false;
  });
}

const observer = observeResize(document.body, () => {
  isOverLg = breakpoint().up('lg');
  if (isOverLg && drawerNode?.open) {
    drawerNode.open = false;
  }
  if (isOverLg) {
    currentAsideMenu = asideMenus[1];
  } else {
    currentAsideMenu = asideMenus[0];
  }

  bindCollapse();

  if (isOverLg && collapsed) {
    collapsed.value = currentActiveMenuMeta.parent;
    changeCollapseItemStates(collapsed);
  }


  bindMenuItems();
  changeMenuItemStates();
});

function bindCollapse() {
  if (collapsed) {
    collapsed.removeEventListener('change', collapseChanged);
    collapsed = null;
  }
  collapsed = (currentAsideMenu as HTMLElement).querySelector('.aside-menu-body') as Collapse;
  if (collapsed) {
    collapsed.addEventListener('change', collapseChanged);
  }
}

function collapseChanged(event: HTMLElementEventMap['change'] & CollapseEventMap['change']) {
  const target = event.target as Collapse;
  currentActiveMenuMeta.parent = target.value as string;
  changeCollapseItemStates(target);
}

function changeCollapseItemStates(collapseNode: Collapse) {
  const items = collapseNode.querySelectorAll('.aside-menu-item') as NodeListOf<CollapseItem>;
  items.forEach((item) => {
    const isOpened = currentActiveMenuMeta.parent === item.value;
    if (isOpened) {
      item.classList.add('opened');
    } else {
      item.classList.remove('opened');
    }
  });
}

function bindMenuItems() {
  const items = currentAsideMenu?.querySelectorAll('.aside-menu-item-content') as NodeListOf<ListItem>;
  items.forEach((item) => {
    item.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as ListItem;
      const { parent, value } = target.dataset;
      const data = MenuItemList.find((item) => item.value === value);
      // console.log('data>>>', data, value, currentActiveMenuItemValue);
      if (data && currentActiveMenuMeta.value !== value) {
        currentActiveMenuMeta = { parent: parent!, value: value! };
        iframe.src = `../pages/${data.path}/`;
        sessionStorage.setItem(StorageKeys.menuItem, JSON.stringify({ parent, value }));
        changeMenuItemStates();
        if (drawerNode?.open) {
          drawerNode.open = false;
        }
      }
    });
  });
}

function changeMenuItemStates() {
  const items = currentAsideMenu?.querySelectorAll('.aside-menu-item-content') as NodeListOf<ListItem>;
  items.forEach((item) => {
    item.active = currentActiveMenuMeta.value === item.dataset.value;
  });
}