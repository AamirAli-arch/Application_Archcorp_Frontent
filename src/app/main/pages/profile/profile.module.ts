import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfileComponent } from "./profile.component";
import { RouterModule } from "@angular/router";
import { FuseSharedModule } from "@fuse/shared.module";
import { ProfileEditComponent } from "./profile-edit/profile-edit.component";
import { PersonalInfomationComponent } from "./personal-infomation/personal-infomation.component";
import { EmergencyContactComponent } from "./emergency-contact/emergency-contact.component";
import { FamilyInformationComponent } from './family-information/family-information.component';
import { EducationInformationComponent } from './education-information/education-information.component';
import { ExperienceInformationComponent } from './experience-information/experience-information.component';

const routes = [
    {
        path: "profile/:id",
        component: ProfileComponent,
    },
];

@NgModule({
    imports: [CommonModule, FuseSharedModule, RouterModule.forChild(routes)],
    declarations: [
        ProfileComponent,
        ProfileEditComponent,
        PersonalInfomationComponent,
        EmergencyContactComponent,
        FamilyInformationComponent,
        EducationInformationComponent,
        ExperienceInformationComponent,
    ],

    entryComponents: [
        ProfileEditComponent,
        PersonalInfomationComponent,
        EmergencyContactComponent,
        FamilyInformationComponent,
        ExperienceInformationComponent
    ],
})
export class ProfileModule {}
