import { NgModule } from '@angular/core';
import { IssuesComponent } from '../components/admin/issues-comp/issues/issues.component';
import { RouterModule, Routes } from '@angular/router';
import { StatisticsComponent } from '../components/admin/statistics-panel/statistics/statistics.component';
import { UsersComponent } from '../components/admin/users-comp/users/users.component';
import { NewUserComponent } from '../components/admin/new-user/new-user.component';
import { DashboardComponent } from '../components/admin/dashboard/dashboard.component';
import { EquipmentComponent } from '../components/admin/equipment-comp/equipment/equipment.component';
import { BuildingComponent } from '../components/admin/building-comp/building/building.component';
import { NewissueComponent } from '../components/admin/newissue/newissue.component';
import {TechnicanTeamsComponent} from "../components/admin/technican-teams/technican-teams.component";


const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'issues', component: IssuesComponent},
  {path: 'statistics', component: StatisticsComponent},
  {path: 'users', component: UsersComponent},
  {path: 'newuser', component: NewUserComponent},
  {path: 'equipment', component: EquipmentComponent},
  {path: 'building', component: BuildingComponent},
  {path: 'newissue', component: NewissueComponent},
  {path: 'technician-team', component: TechnicanTeamsComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
