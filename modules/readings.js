'use strict';

function readings(informations) {
    const output = Object.create(null);

    const kMandarin = informations.kMandarin ? [informations.kMandarin.cn] : [];
    const kHanyuPinlu = informations.kHanyuPinlu ? informations.kHanyuPinlu.map(value => value.pinyin) : [];
    const kXHC1983 = informations.kXHC1983 ? informations.kXHC1983 : [];
    const kHanyuPinyin = informations.kHanyuPinyin ? [].concat(...informations.kHanyuPinyin) : []

    return [...new Set([...kMandarin, ...kHanyuPinlu, ...kXHC1983, ...kHanyuPinyin])];
}

module.exports = readings;