import {Component} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {Router, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {BookMonkeyApp as PipesApp} from './pipes/pipes.app';
import {BookMonkeyApp as DirectivesApp} from './directives/directives.app';

@Component({
  selector: 'iteration-5',
  template: `
    <div class="ui two small ordered steps">
    <a [routerLink]="['Pipes']"
       [class.active]="router.isRouteActive(router.generate(['./Pipes']))"
       class="step">
      <div class="content">
        <div class="title">Pipes</div>
      </div>
    </a>
    <a [routerLink]="['Directives']"
       [class.active]="router.isRouteActive(router.generate(['./Directives']))"
       class="step">
      <div class="content">
        <div class="title">Direktiven</div>
      </div>
    </a>
  </div>
  <div class="ui raised padded container segment">
    <router-outlet></router-outlet>
  </div>
  `,
  directives: [ROUTER_DIRECTIVES],
  providers: [HTTP_PROVIDERS]
})
@RouteConfig([
  {path: 'pipes/...', name: 'Pipes', component: PipesApp, useAsDefault: true},
  {path: 'directives/...', name: 'Directives', component: DirectivesApp}
])
export class IterationFiveComponent {
  constructor(private router: Router) { }
}
