// utils/viewTracker.js

const VIEWS_KEY = 'product-views';

export function getProductViews() {
  if (typeof window !== 'undefined') {
    const viewsData = localStorage.getItem(VIEWS_KEY);
    return viewsData ? JSON.parse(viewsData) : {};
  }
  return {};
}

export function trackProductView(productId) {
  if (typeof window !== 'undefined') {
    const viewsData = getProductViews();
    const productIdStr = productId.toString();
    
    if (!viewsData[productIdStr]) {
      viewsData[productIdStr] = 1;
    } else {
      viewsData[productIdStr] += 1;
    }
    
    localStorage.setItem(VIEWS_KEY, JSON.stringify(viewsData));
    return viewsData[productIdStr];
  }
  return 0;
}

export function getProductViewCount(productId) {
  const viewsData = getProductViews();
  return viewsData[productId.toString()] || 0;
}