describe('Basic user flow for Website', () => {
  // First, visit the lab 7 website
  beforeAll(async () => {
    await page.goto('https://cse110-sp25.github.io/CSE110-Shop/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  // Each it() call is a separate test
  // Here, we check to make sure that all 20 <product-item> elements have loaded
  it('Initial Home Page - Check for 20 product items', async () => {
    console.log('Checking for 20 product items...');

    const numProducts = await page.$$eval('product-item', (prodItems) => {
      return prodItems.length;
    });

    expect(numProducts).toBe(20);
  });

  // STEP 1
  it('Make sure <product-item> elements are populated', async () => {
    console.log('Checking to make sure <product-item> elements are populated...');

    let allArePopulated = true;

    const prodItemsData = await page.$$eval('product-item', prodItems => {
      return prodItems.map(item => {
        return item.data;
      });
    });

    for (let i = 0; i < prodItemsData.length; i++) {
      console.log(`Checking product item ${i + 1}/${prodItemsData.length}`);

      let item = prodItemsData[i];

      if (item.title.length == 0) { allArePopulated = false; }
      if (item.price.length == 0) { allArePopulated = false; }
      if (item.image.length == 0) { allArePopulated = false; }
    }

    expect(allArePopulated).toBe(true);
  }, 10000);

  // STEP 2
  it('Clicking the "Add to Cart" button should change button text', async () => {
    console.log('Checking the "Add to Cart" button...');

    const productItem = await page.$('product-item');
    const shadowRoot = await productItem.getProperty('shadowRoot');
    const button = await shadowRoot.$('button');

    await button.click();

    const innerText = await button.getProperty('innerText');
    const textValue = await innerText.jsonValue();

    expect(textValue.trim()).toBe('Remove from Cart');
  }, 2500);

  // STEP 3
  it('Checking number of items in cart on screen', async () => {
    console.log('Checking number of items in cart on screen...');

    await page.evaluate(() => {
      const productItems = document.querySelectorAll('product-item');

      productItems.forEach(item => {
        const button = item.shadowRoot.querySelector('button');

        if (button.innerText.trim() === 'Add to Cart') {
          button.click();
        }
      });
    });

    const cartCount = await page.$eval('#cart-count', element => element.innerText);

    expect(cartCount.trim()).toBe('20');
  }, 10000);

  // STEP 4
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');

    await page.reload();

    const buttonTexts = await page.$$eval('product-item', productItems => {
      return productItems.map(item => {
        return item.shadowRoot.querySelector('button').innerText.trim();
      });
    });

    for (let i = 0; i < buttonTexts.length; i++) {
      expect(buttonTexts[i]).toBe('Remove from Cart');
    }

    const cartCount = await page.$eval('#cart-count', element => element.innerText);

    expect(cartCount.trim()).toBe('20');
  }, 10000);

  // STEP 5
  it('Checking the localStorage to make sure cart is correct', async () => {
    const cart = await page.evaluate(() => {
      return localStorage.getItem('cart');
    });

    expect(cart).toBe('[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]');
  });

  // STEP 6
  it('Checking number of items in cart on screen after removing from cart', async () => {
    console.log('Checking number of items in cart on screen...');

    await page.evaluate(() => {
      const productItems = document.querySelectorAll('product-item');

      productItems.forEach(item => {
        const button = item.shadowRoot.querySelector('button');

        if (button.innerText.trim() === 'Remove from Cart') {
          button.click();
        }
      });
    });

    const cartCount = await page.$eval('#cart-count', element => element.innerText);

    expect(cartCount.trim()).toBe('0');
  }, 10000);

  // STEP 7
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');

    await page.reload();

    const buttonTexts = await page.$$eval('product-item', productItems => {
      return productItems.map(item => {
        return item.shadowRoot.querySelector('button').innerText.trim();
      });
    });

    for (let i = 0; i < buttonTexts.length; i++) {
      expect(buttonTexts[i]).toBe('Add to Cart');
    }

    const cartCount = await page.$eval('#cart-count', element => element.innerText);

    expect(cartCount.trim()).toBe('0');
  }, 10000);

  // STEP 8
  it('Checking the localStorage to make sure cart is correct', async () => {
    console.log('Checking the localStorage...');

    const cart = await page.evaluate(() => {
      return localStorage.getItem('cart');
    });

    expect(cart).toBe('[]');
  });
});