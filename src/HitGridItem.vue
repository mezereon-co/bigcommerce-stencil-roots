<template>
  <div v-cloak class="product">
    <slot>
      <article class="card">
        <figure class="card-figure">
          <div v-if="isOnSale" class="sale-flag-side">
            <span class="sale-text">Sale</span>
          </div>
          <div v-if="item.out_of_stock_message" class="stock-badge">
            <span class="stock-message">
              {{ item.out_of_stock_message }}
            </span>
          </div>
          <div
            v-else-if="
              item.inventory_tracking === 'product' &&
                item.inventory_level === 0
            "
            class="stock-badge"
          >
            <span class="stock-message">Out of stock</span>
          </div>
          <a
            :href="item.custom_url.url"
            @click="trackEvent(item, index, 'click')"
          >
            <div class="card-img-container">
              <img
                v-lazy="{
                  src: item.image,
                  error: 'https://via.placeholder.com/220/eee'
                }"
                class="card-image"
              />
            </div>
          </a>
          <figcaption class="card-figcaption">
            <div class="card-figcaption-body">
              <div class="card-figcaption--action-buttons">
                <a
                  v-if="context.showProductQuickView"
                  class="button button--secondary button--small card-figcaption-button quickview"
                  :data-product-id="item.id"
                >
                  {{ context.langQuickView }}
                </a>
                <template v-if="context.customer || !context.restrictToLogin">
                  <a
                    v-if="item.option_set_id"
                    :href="item.custom_url.url"
                    data-event-type="product-click"
                    class="button button--small card-figcaption-button"
                    :data-product-id="item.id"
                  >
                    {{ context.langChooseOptions }}
                  </a>
                  <a
                    v-else-if="item.availability === 'preorder'"
                    :href="'/cart.php?action=add&amp;product_id=' + item.id"
                    data-event-type="product-click"
                    class="button button--small card-figcaption-button"
                    :data-product-id="item.id"
                    @click="trackEvent(item, index, 'add2cart')"
                  >
                    <span>{{ context.langPreOrder }}</span>
                  </a>
                  <a
                    v-else-if="item.out_of_stock_message"
                    :href="item.custom_url.url"
                    data-event-type="product-click"
                    class="button button--small card-figcaption-button"
                    :data-product-id="item.id"
                    @click="trackEvent(item, index, 'click')"
                  >
                    <span>{{ item.out_of_stock_message }}</span>
                  </a>
                  <span
                    v-else-if="
                      item.inventory_tracking === 'product' &&
                        item.inventory_level === 0
                    "
                  ></span>
                  <a
                    v-else
                    :href="'/cart.php?action=add&amp;product_id=' + item.id"
                    data-event-type="product-click"
                    class="button button--small card-figcaption-button"
                    @click="trackEvent(item, index, 'add2cart')"
                  >
                    {{ context.langAddToCart }}
                  </a>
                </template>
              </div>
              <label
                v-if="context.showCompare"
                class="card-compare"
                :for="'compare-' + item.id"
              >
                <input
                  :id="'compare-' + item.id"
                  v-model="checked"
                  type="checkbox"
                  name="products[]"
                  class="compare-input"
                  :value="item.id"
                  :data-compare-id="item.id"
                  @change="onCompareInputChange"
                />
                <span v-show="checked">Remove from </span>
                {{ context.langCompare }}
              </label>
              <div v-if="context.showCompare" class="compare-button-wrap">
                <a
                  v-show="checked"
                  class="compare-button"
                  :href="compareUrl"
                  data-compare-nav
                >
                  {{ context.langCompare }}
                  <span
                    class="countPill countPill--positive countPill--alt"
                  ></span>
                  Items
                </a>
              </div>
            </div>
          </figcaption>
        </figure>
        <div class="card-body">
          <h4 class="card-title">
            <a
              :href="item.custom_url.url"
              @click="trackEvent(item, index, 'click')"
            >
              <span v-html="item.name"></span>
            </a>
          </h4>
          <div class="card-text">
            <div
              class="price-section price-section--withoutTax"
              data-test-info-type="price"
            >
              <span
                v-if="isOnSale"
                data-product-non-sale-price-without-tax
                class="regular-price price"
              >
                {{ item.price | currency }}
              </span>
              <span
                data-product-price-without-tax
                class="price price--withoutTax"
              >
                {{ item.calculated_price | currency }}
              </span>
              <span
                v-if="item.retail_price"
                data-product-rrp-price-without-tax
                class="price price--rrp"
              >
                {{ item.retail_price | currency }}
              </span>
            </div>
          </div>
          <p class="card-text" data-test-info-type="brandName">
            {{ item.brand | value }}
          </p>
          <div class="card-details">
            <p class="card-text" data-test-info-type="productRating">
              <span class="rating--small">
                <rating :rating="item.reviews_rating_sum"></rating>
              </span>
            </p>
          </div>
        </div>
      </article>
    </slot>
  </div>
</template>

<script>
import Hits from './Hits.js'
import Rating from './Rating.vue'

export default {
  components: {
    Rating
  },
  mixins: [Hits],
  props: {
    item: {
      type: Object,
      required: true
    },
    score: {
      type: Number,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      checked: false,
      compareUrl: () => this.context.compareUrl
    }
  },
  computed: {
    isOnSale() {
      return this.item.price !== this.item.calculated_price
    }
  },
  methods: {
    onCompareInputChange() {
      const counter = []
      const compareInputs = document.querySelectorAll('.compare-input:checked')
      compareInputs.forEach(item => {
        counter.push(item.value)
      })
      this.compareUrl = `${this.context.compareUrl}${counter.join('/')}`
      const wraps = document.querySelectorAll('.compare-button-wrap')
      const self = this
      wraps.forEach(item => {
        item.style.display = compareInputs.length > 0 ? 'block' : 'none'
        item.style.visibility = compareInputs.length > 0 ? 'visible' : 'hidden'
        item.href = self.compareUrl
      })
    }
  }
}
</script>
