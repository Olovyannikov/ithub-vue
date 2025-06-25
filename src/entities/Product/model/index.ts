import { restore, sample } from 'effector';

import { atom } from '@/shared/factories';
import { appStarted } from '@/shared/services';

import { getAllProductsQuery } from '../api';
import { findCategories } from '../lib/findByParams';
import { mapCategoriesLabels } from '../lib/mapCategories';

export const ProductModel = atom(() => {
    const $categories = restore(
        getAllProductsQuery.finished.success.map(({ result }) => mapCategoriesLabels(findCategories(result))),
        []
    );

    sample({
        clock: appStarted,
        target: getAllProductsQuery.start,
    });

    return {
        $categories,
    };
});
