import { Injectable, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import * as prismic from 'prismic-javascript';


@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  // private active = 'light';
  // private availableThemes: Theme[] = [light, dark];

  apiEndpoint = 'https://jsbuchmannsite.prismic.io/api/v2';

  getSettings(): Observable<any> {
    return from(
      prismic.getApi(this.apiEndpoint).then((api) => {
      return api.query(
        prismic.Predicates.at('document.type', 'settings'),
        { pageSize : 100 }
      );
    })
    );
  }

  setSettings(): void {
    from(
      prismic.getApi(this.apiEndpoint).then((api) => {
      return api.query(
        prismic.Predicates.at('document.type', 'settings'),
        { pageSize : 100 }
      );
    })
    ).subscribe((res) => {
      const settings =  res.results[0].data;
      Object.keys(settings).forEach((prop) => {
        document.documentElement.style.setProperty(
          prop,
          settings[prop]
        );
      })
    });
  }



  // setActiveTheme(theme: Theme): void {
  //   this.active = theme;

  //   Object.keys(this.active.properties).forEach(property => {
  //     document.documentElement.style.setProperty(
  //       property,
  //       this.active.properties[property]
  //     );
  //   });
  // }





}
