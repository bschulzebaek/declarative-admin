<script lang="ts">
export default Shopware.Component.wrapComponentConfig({
    mixins: [
        Shopware.Mixin.getByName('generic-module'),
        'salutation',
    ],
    data() {
        return {
            activeTabName: null,
        };
    },
    computed: {
        store() {
            return Shopware.Store.get('generic-store');
        },
        review() {
            return this.store.currentItem;
        },
        dateFilter() {
            return Shopware.Filter.getByName('date');
        },
        emailIdnFilter() {
            return Shopware.Filter.getByName('decode-idn-email');
        },
        stars() {
            if (this.review.points >= 0) {
                return this.review.points;
            }

            return 0;
        },
    },
});
</script>

<template>
    <mt-card
        v-if="review"
        class="sw-review-detail"
        :is-loading="store.isLoading"
        :title="$tc('sw-review.detail.cardTitleReviewInfo')"
    >
        <template #grid>
            <sw-container rows="auto auto">

                <sw-card-section divider="bottom">
                    <sw-container>
                        <div class="sw-review-detail__metadata">
                            <div class="sw-review-detail__metadata-review-headline">
                                <sw-container
                                    columns="auto 150px"
                                    gap="0px 15px"
                                >
                                    <div class="sw-review-detail__metadata-review-title">
                                        {{ review.title }}
                                    </div>
                                    <div
                                        v-if="stars"
                                        class="sw-review-detail__metadata-review-stars"
                                    >
                                        <sw-rating-stars
                                            :value="review.points"
                                            class="star-count-display"
                                        />
                                        <div class="star-count-description">
                                            {{ $tc(`sw-review.detail.review${Math.round(stars)}PointRatingText`) }}
                                        </div>
                                    </div>
                                </sw-container>
                            </div>
                            <p class="sw-review-detail__metadata-review-content">
                                {{ review.content }}
                            </p>
                        </div>
                    </sw-container>
                </sw-card-section>
                <sw-card-section
                    secondary
                    slim
                >
                    <slot name="default">

                        <sw-container
                            class="sw-review-base-info"
                            columns="repeat(auto-fit, minmax(250px, 1fr))"
                            gap="0px 15px"
                        >
                            <div class="sw-review-base-info-columns">

                                <sw-description-list>

                                    <dt class="sw-review-base-info__label">
                                        {{ $tc('sw-review.detail.labelCreatedAt') }}
                                    </dt>
                                    <dd>
                                        {{ dateFilter(review.createdAt, { hour: '2-digit', minute: '2-digit', second: '2-digit' }) }}
                                    </dd>
                                </sw-description-list>
                                <sw-description-list>
                                    <dt class="sw-review-base-info__label">
                                        {{ $tc('sw-review.detail.labelSalesChannel') }}
                                    </dt>
                                    <dd>
                                        {{ review.salesChannel.name }}
                                    </dd>
                                </sw-description-list>

                                <sw-description-list>

                                    <dt class="sw-review-base-info__label">
                                        {{ $tc('sw-review.detail.labelProduct') }}
                                    </dt>
                                    <dd>{{ review.product.translated.name }}</dd>
                                </sw-description-list>
                            </div>
                            <div class="sw-review-base-info-columns">
                                <sw-description-list>
                                    <dt class="sw-review-base-info__label">
                                        {{ $tc('sw-review.detail.labelCustomer') }}
                                    </dt>
                                    <dd v-if="review.customer">
                                        {{ salutation(review.customer) }}
                                    </dd>
                                    <dd v-else>
                                        {{ review.externalUser }}
                                    </dd>
                                </sw-description-list>

                                <sw-description-list>
                                    <dt class="sw-review-base-info__label">
                                        {{ $tc('sw-review.detail.labelEmail') }}
                                    </dt>
                                    <dd v-if="review.customer">
                                        {{ emailIdnFilter(review.customer.email) }}
                                    </dd>
                                    <dd v-else>
                                        {{ review.externalEmail }}
                                    </dd>
                                </sw-description-list>
                            </div>
                        </sw-container>
                    </slot>
                </sw-card-section>
            </sw-container>
        </template>
    </mt-card>
</template>

<style lang="scss" scoped>
@import "~scss/variables";

$sw-review-detail-base-color-text: $color-darkgray-200;

.sw-review-detail {
    .sw-review-detail__container {
        margin-bottom: 16px;
    }

    .sw-review-detail__metadata-review-stars {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        margin-right: 2px;
    }

    .star-count-description {
        font-weight: $font-weight-bold;
        font-size: $font-size-s;
        margin-top: -8px;
    }

    .sw-review-detail__metadata-review-content {
        word-break: break-word;
    }

    .contents-border-styling {
        dt:last-of-type {
            border: 0;
        }

        dd:last-of-type {
            border: 0;
        }
    }

    .review-status-true {
        color: $color-emerald-500;
    }

    .review-status-false {
        color: $color-crimson-500;
    }

    .sw-review-detail__metadata-review-title {
        font-weight: $font-weight-semi-bold;
        font-size: $font-size-m;
        margin-bottom: 1px;
        word-break: break-word;
    }

    .sw-review-base-info {
        color: $sw-review-detail-base-color-text;
        font-size: $font-size-xs;
        margin-bottom: 16px;

        .sw-review-base-info-columns {
            word-break: break-word;

            dt {
                padding: 21px 4px 4px;
            }

            dd {
                padding: 1px 4px;
            }
        }
    }

    .smart-bar__actions {
        .sw-tooltip--wrapper {
            margin-left: 8px;
        }
    }
}
</style>
