import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { NavigationComponent } from  '../../components/navigation/navigation.component';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { NavLeftComponent } from '../../components/nav-bar/nav-left/nav-left.component';
import { NavRightComponent } from '../../components/nav-bar/nav-right/nav-right.component';
import { NavContentComponent } from '../../components/navigation/nav-content/nav-content.component';
import { NavCollapseComponent } from '../../components/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavGroupComponent } from '../../components/navigation/nav-content/nav-group/nav-group.component';
import { NavItemComponent } from '../../components/navigation/nav-content/nav-item/nav-item.component';
import { AdminComponent } from './admin.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgbDropdownModule, NgbNavModule, NgbModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [
    AdminComponent,
    NavigationComponent,
    NavBarComponent,
    NavLeftComponent,
    NavRightComponent,
    NavContentComponent,
    NavCollapseComponent,
    NavGroupComponent,
    NavItemComponent,
    BreadcrumbComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgScrollbarModule,
    NgbNavModule,
    NgbDropdownModule,
    NgbModule,
    NgbCollapseModule
  ]
})
export class AdminModule { }
