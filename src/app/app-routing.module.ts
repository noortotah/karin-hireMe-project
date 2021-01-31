import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'new-candidate', loadChildren: './new-candidate/new-candidate.module#NewCandidatePageModule' },
  { path: 'candidate', loadChildren: './candidate/candidate.module#CandidatePageModule' },
  { path: 'interview', loadChildren: './interview/interview.module#InterviewPageModule' },
  { path: 'psifas-test', loadChildren: './psifas-test/psifas-test.module#PsifasTestPageModule' },
  { path: 'candidate-list', loadChildren: './candidate-list/candidate-list.module#CandidateListPageModule' },
  { path: 'salary', loadChildren: './salary/salary.module#SalaryPageModule' },
  { path: 'forms', loadChildren: './forms/forms.module#FormsPageModule' },
  { path: 'open-systems', loadChildren: './open-systems/open-systems.module#OpenSystemsPageModule' },
  { path: 'popdata', loadChildren: './popover/popdata/popdata.module#PopdataPageModule' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
  




}
