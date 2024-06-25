// Angular import
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule, Event } from '@angular/router';
import { Title } from '@angular/platform-browser';

// project import
import { NavigationItem, NavigationItems } from '../navigation/navigation';

interface titleType {
  // eslint-disable-next-line
  url: string | boolean | any;
  title: string;
  breadcrumbs: unknown;
  type: string;
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})

export class BreadcrumbComponent {
  // public props
  @Input() type: string;
  navigations: NavigationItem[];
  ComponentNavigations: NavigationItem[];
  breadcrumbList: Array<string> = [];
  navigationList!: titleType[];
  componentList!: titleType[];

  // constructor
  constructor(
    private route: Router,
    private titleService: Title
  ) {
    this.navigations = NavigationItems;
    this.type = 'theme1';
    this.setBreadcrumb();
  }

  // public method
  setBreadcrumb() {
    this.route.events.subscribe((router: Event) => {
      if (router instanceof NavigationEnd) {
        const activeLink = router.url;
        const breadcrumbList = this.filterNavigation(this.navigations, activeLink);
        console.log('breadcrumbList ==== ', breadcrumbList);
        
        this.navigationList = breadcrumbList;
        this.componentList = this.filterNavigation(this.ComponentNavigations, activeLink);
        const title = breadcrumbList[breadcrumbList.length - 1]?.title || 'Welcome';
        this.titleService.setTitle(title + ' | Mantis  Angular Admin Template');
      }
    });
  }

  filterNavigation(navItems: NavigationItem[], activeLink: string): titleType[] {
    if (navItems && navItems.length > 0) {
      for (const navItem of navItems) {
        if (navItem.type === 'item' && 'url' in navItem && navItem.url === activeLink) {
          console.log('inside item ====');
          return [
            {
              url: 'url' in navItem ? navItem.url : false,
              title: navItem.title,
              breadcrumbs: 'breadcrumbs' in navItem ? navItem.breadcrumbs : true,
              type: navItem.type
            }
          ];
        }
        if ((navItem.type === 'group' || navItem.type === 'collapse') && 'children' in navItem) {
          console.log('inside group or collapse ====');
          // eslint-disable-next-line
          const breadcrumbList = this.filterNavigation(navItem.children!, activeLink);
          if (breadcrumbList.length > 0) {
            breadcrumbList.unshift({
              url: 'url' in navItem ? navItem.url : false,
              title: navItem.title,
              breadcrumbs: 'breadcrumbs' in navItem ? navItem.breadcrumbs : true,
              type: navItem.type
            });
            return breadcrumbList;
          }
        }
      }
    }
    return [];
  }
}
