let prev = [
  {"name":"CepInfo","classes":[],"order":0,"toggle":1},
  {"name":"ProductTopAdvertisement","classes":[],"order":1,"toggle":1},
  {"name":"ProductImage","order":2,"toggle":1},
  {"name":"EmptyComponent","classes":[],"style":"height: 4px","order":3,"toggle":1},
  {"name":"ProductTitle","classes":["module-lineType3"],"style":"","order":4,"toggle":1},
  {"name":"ProductOption","classes":["module-lineType3"],"order":5,"toggle":1},
  {"name":"ProductPrice","classes":["module-lineType3"],"order":6,"toggle":1},
  {"name":"ProductDelivery","classes":["module-lineType2"],"order":7,"toggle":1},
  {"name":"ComponentGap","classes":["module-lineType1"],"style":"border-bottom: 12px solid #f5f5f5;","order":8,"toggle":1},
  {"name":"ExpiryDateInfo","classes":["module-lineType2"],"order":9,"toggle":1},
  {"name":"ProductBenefit","classes":["module-lineType2"],"order":10,"toggle":1},
  {"name":"ProductGift","classes":["module-lineType2"],"order":11,"toggle":0},
  {"name":"PointBenefit","classes":["module-lineType2"],"order":12,"toggle":1},
  {"name":"FreeGift","classes":["module-lineType3"],"order":13,"toggle":1},
  {"name":"ComponentGap","classes":["module-lineType1"],"order":14,"toggle":1},
  {"name":"ProductAdditionalInfo","classes":["module-lineType2"],"order":15,"toggle":1},
  {"name":"SaleStoreInfo","classes":["module-lineType2"],"order":16,"toggle":1},
  {"name":"ProductStatus","classes":["module-lineType2"],"order":17,"toggle":1},
  {"name":"ComponentGap","classes":["module-lineType1"],"order":18,"toggle":1},
  {"name":"ProductSellerInfo","classes":["module-lineType2"],"order":19,"toggle":1},
  {"name":"ComponentGap","classes":["module-lineType1"],"order":20,"toggle":1},
  {"name":"AdvertisementProduct","classes":["module-lineType2"],"order":21,"toggle":1},
  {"name":"ComponentGap","classes":["module-lineType1"],"order":22,"toggle":1},
  {"name":"ProductBannerForEvent","classes":["module-lineType2"],"order":23,"toggle":1},
  {"name":"JntBanner","classes":["module-lineType2"],"order":24,"toggle":1},
  {"name":"BannerCouponExpedition","classes":["module-lineType2"],"order":25,"toggle":1},
  {"name":"ComponentGap","classes":["module-lineType1"],"order":26,"toggle":1},
  {"name":"ProductAttributeInfo","classes":["module-lineType2"],"order":27,"toggle":1},
  {"name":"ComponentGap","classes":["module-lineType1"],"order":28,"toggle":1},
  {"name":"StickyTab","classes":["module-lineType2"],"order":29,"toggle":1},
  {"name":"BannerFraudPrevention","classes":[],"order":30,"toggle":1},
  {"name":"ProductDetailInfo","classes":["module-lineType2"],"order":31,"toggle":1},
  {"name":"ComponentGap","classes":["module-lineType1"],"order":32,"toggle":1},
  {"name":"ReviewSummary","classes":["module-lineType2"],"order":33,"toggle":1},
  {"name":"ComponentGap","classes":["module-lineType1"],"order":34,"toggle":1},
  {"name":"QnaSummary","classes":["module-lineType2"],"order":35,"toggle":1},
  {"name":"ComponentGap","classes":["module-lineType1"],"order":36,"toggle":1},
  {"name":"ShippingPolicyCommonPd","classes":["module-lineType2"],"order":37,"toggle":0},
  {"name":"ProductEstlexprInfo","classes":["module-lineType2"],"order":38,"toggle":1},
  {"name":"ShippingPolicy","classes":["module-lineType2"],"order":39,"toggle":1},
  {"name":"Caution","classes":["module-lineType2"],"order":40,"toggle":1},
  {"name":"AsInfo","classes":["module-lineType2"],"order":41,"toggle":1},
  {"name":"ComponentGap","classes":["module-lineType1"],"order":42,"toggle":1},
  {"name":"ProductRecommendNodata","classes":["module-lineType2"],"order":43,"toggle":1},
  {"name":"ProductRecommend","classes":["module-lineType2"],"order":44,"toggle":0},
  {"name":"WatchedTogether","classes":["module-lineType2"],"order":45,"toggle":1},
  {"name":"GoodToShopWith","classes":["module-lineType2"],"order":46,"toggle":1},
  {"name":"RecommendKeywordList","classes":["module-lineType2"],"order":47,"toggle":1},
  {"name":"ComponentGap","classes":["module-lineType1"],"order":48,"toggle":1},
  {"name":"InsrAdvertisement","classes":["module-lineType2"],"order":49,"toggle":1},
  {"name":"ComponentGap","classes":["module-lineType1"],"order":50,"toggle":1},
  {"name":"StyleRecommendedItems","classes":["module-lineType2"],"order":51,"toggle":1},
  {"name":"RecommendRecipe","classes":["module-lineType2"],"order":52,"toggle":1},
  {"name":"CategoryProduct","classes":["module-lineType2"],"order":53,"toggle":1},
  {"name":"RelativePromotion","classes":["module-lineType2"],"order":54,"toggle":1},
  {"name":"BestProductList","classes":["module-lineType2"],"order":55,"toggle":1},
  {"name":"SellerRecommend","classes":["module-lineType2"],"order":56,"toggle":1},
  {"name":"AdvertisementProductList","classes":["module-lineType2"],"order":57,"toggle":1},
  {"name":"EmptyComponent","classes":[],"style":"height: 50px","order":58,"toggle":1}
];
prev.forEach((module, idx) => {
  module._id = `${module.name}_${idx}`;
  module.id = module.name;
})
prev = prev.filter(m => m.name !== 'ComponentGap' && m.name !== 'EmptyComponent' && m.toggle === 1);

let current = [
  {"name":"CepInfo","classes":[],"order":1,"toggle":1},
  {"name":"ProductTopAdvertisement","classes":[],"order":0,"toggle":1},
  {"name":"ProductImage","order":50,"toggle":1},
  {"name":"EmptyComponent","classes":[],"style":"height: 4px","order":3,"toggle":1},
  {"name":"ProductTitle","classes":["module-lineType3"],"style":"","order":4,"toggle":1},
  {"name":"ProductOption","classes":["module-lineType3"],"order":7,"toggle":1},
  {"name":"ProductPrice","classes":["module-lineType3"],"order":6,"toggle":1},
  {"name":"ProductDelivery","classes":["module-lineType2"],"order":5,"toggle":1},
  {"name":"ComponentGap","classes":["module-lineType1"],"style":"border-bottom: 12px solid #f5f5f5;","order":8,"toggle":1},
  {"name":"ExpiryDateInfo","classes":["module-lineType2"],"order":9,"toggle":1},
  {"name":"ProductBenefit","classes":["module-lineType2"],"order":10,"toggle":1},
  {"name":"ProductGift","classes":["module-lineType2"],"order":11,"toggle":0},
  {"name":"PointBenefit","classes":["module-lineType2"],"order":12,"toggle":1},
  {"name":"FreeGift","classes":["module-lineType3"],"order":13,"toggle":1},
  {"name":"ComponentGap","classes":["module-lineType1"],"order":14,"toggle":1},
  {"name":"SaleStoreInfo","classes":["module-lineType2"],"order":16,"toggle":1},
  {"name":"ProductStatus","classes":["module-lineType2"],"order":17,"toggle":1},
  {"name":"ComponentGap","classes":["module-lineType1"],"order":18,"toggle":1},
  {"name":"ProductSellerInfo","classes":["module-lineType2"],"order":19,"toggle":1},
  {"name":"ComponentGap","classes":["module-lineType1"],"order":20,"toggle":1},
  {"name":"AdvertisementProduct","classes":["module-lineType2"],"order":21,"toggle":1},
  {"name":"ComponentGap","classes":["module-lineType1"],"order":22,"toggle":1},
  {"name":"ProductBannerForEvent","classes":["module-lineType2"],"order":23,"toggle":1},
  {"name":"JntBanner","classes":["module-lineType2"],"order":24,"toggle":1},
  {"name":"BannerCouponExpedition","classes":["module-lineType2"],"order":25,"toggle":1},
  {"name":"ComponentGap","classes":["module-lineType1"],"order":26,"toggle":1},
  {"name":"ProductAttributeInfo","classes":["module-lineType2"],"order":27,"toggle":1},
  {"name":"ComponentGap","classes":["module-lineType1"],"order":28,"toggle":1},
  {"name":"StickyTab","classes":["module-lineType2"],"order":29,"toggle":1},
  {"name":"BannerFraudPrevention","classes":[],"order":30,"toggle":1},
  {"name":"ProductDetailInfo","classes":["module-lineType2"],"order":31,"toggle":1},
  {"name":"ComponentGap","classes":["module-lineType1"],"order":32,"toggle":1},
  {"name":"ReviewSummary","classes":["module-lineType2"],"order":33,"toggle":1},
  {"name":"ComponentGap","classes":["module-lineType1"],"order":34,"toggle":1},
  {"name":"QnaSummary","classes":["module-lineType2"],"order":35,"toggle":1},
  {"name":"ComponentGap","classes":["module-lineType1"],"order":36,"toggle":1},
  {"name":"ShippingPolicyCommonPd","classes":["module-lineType2"],"order":37,"toggle":0},
  {"name":"ProductEstlexprInfo","classes":["module-lineType2"],"order":38,"toggle":1},
  {"name":"NewComponent1","classes":["module-lineType2"],"order":38,"toggle":1},
  {"name":"ShippingPolicy","classes":["module-lineType2"],"order":39,"toggle":1},
  {"name":"Caution","classes":["module-lineType2"],"order":40,"toggle":1},
  {"name":"AsInfo","classes":["module-lineType2"],"order":41,"toggle":1},
  {"name":"ComponentGap","classes":["module-lineType1"],"order":42,"toggle":1},
  {"name":"ProductRecommendNodata","classes":["module-lineType2"],"order":43,"toggle":1},
  {"name":"ProductRecommend","classes":["module-lineType2"],"order":44,"toggle":0},
  {"name":"WatchedTogether","classes":["module-lineType2"],"order":45,"toggle":1},
  {"name":"GoodToShopWith","classes":["module-lineType2"],"order":46,"toggle":1},
  {"name":"RecommendKeywordList","classes":["module-lineType2"],"order":47,"toggle":1},
  {"name":"ComponentGap","classes":["module-lineType1"],"order":48,"toggle":1},
  {"name":"InsrAdvertisement","classes":["module-lineType2"],"order":49,"toggle":1},
  {"name":"ComponentGap","classes":["module-lineType1"],"order":2,"toggle":1},
  {"name":"StyleRecommendedItems","classes":["module-lineType2"],"order":51,"toggle":1},
  {"name":"RecommendRecipe","classes":["module-lineType2"],"order":52,"toggle":1},
  {"name":"CategoryProduct","classes":["module-lineType2"],"order":53,"toggle":1},
  {"name":"RelativePromotion","classes":["module-lineType2"],"order":54,"toggle":1},
  {"name":"BestProductList","classes":["module-lineType2"],"order":55,"toggle":1},
  {"name":"SellerRecommend","classes":["module-lineType2"],"order":56,"toggle":1},
  {"name":"AdvertisementProductList","classes":["module-lineType2"],"order":57,"toggle":1},
  {"name":"EmptyComponent","classes":[],"style":"height: 50px","order":58,"toggle":1},
  {"name":"NewComponent2","classes":[],"style":"height: 50px","order":59,"toggle":1},
];
current.forEach((module, idx) => {
  module._id = `${module.name}_${idx}`;
  module.id = module.name;
})
current = current.filter(m => m.name !== 'ComponentGap' && m.name !== 'EmptyComponent' && m.toggle === 1);
