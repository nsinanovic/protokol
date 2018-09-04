import { Component, OnInit } from '@angular/core';
import { Project } from './project';
import { ProjectsService } from './projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Array<Project>;
  keyword: string;
  all: Array<Project>;

  constructor(private projectsService: ProjectsService) { }

  ngOnInit() {
    this.projectsService.getProjects().subscribe((data: Array<Project>) => {
      this.projects = data;
      this.all = data;
    });
  }

  search() {
    if (!this.keyword) {
      this.projects = this.all;
    }
    else {
      var search = this.keyword;
      this.projects = this.all.filter(function (o) {
        return Object.keys(o).some(function (k) {
          return o[k].toString().toLowerCase().indexOf(search) != -1;
        })
      })
    }
  }
}
