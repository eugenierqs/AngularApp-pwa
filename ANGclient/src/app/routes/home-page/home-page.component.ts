import { Component, OnInit } from '@angular/core';
import { MerchantService } from "../../services/merchant/merchant.service";


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  providers: [ MerchantService ]
})
export class HomePageComponent implements OnInit {
  
  public merchantCollection: Array<any>
  public merchantCollectionRaw: Array<any>
  public categoriesCollectionSlug: Array<string>
  public categoriesCollection: Array<any>
  public activeCategory:string


  constructor(
    private MerchantService: MerchantService
  ) { 
    this.categoriesCollectionSlug = []
    this.categoriesCollection = []
    this.activeCategory = 'all'
  }

  private getMerchantList = () => {
    this.MerchantService.readAllItems()
    .then( apiResponse => { 
      this.getMerchantCategories(apiResponse.data)
      this.merchantCollection = apiResponse.data
      this.merchantCollectionRaw = apiResponse.data

    } )
    .catch(apiResponse => console.log(apiResponse))
  }

  private getMerchantCategories = (data:any) => {
    data.map( (item: any) => {
      item.category.isActive = false
      if (this.categoriesCollectionSlug.indexOf(item.category.slug) === -1) {
        this.categoriesCollectionSlug.push(item.category.slug)
        this.categoriesCollection.push(item.category)
      }
    })
    // console.table(data[0])
  }

  public sortMerchant = (cat:any) => {
    console.log(this.merchantCollection)

    this.activeCategory = cat.slug
    // console.log(`%c la catégorie est ${slug}`, `color:red`)

    cat.isActive = true

    const tempArray = [];

    this.merchantCollectionRaw.map( item => {
      if(item.category.slug === cat.slug) {
        tempArray.push(item)
      }
    })
    this.merchantCollection = tempArray;
  }

  ngOnInit() {
    this.getMerchantList()
  }

}
