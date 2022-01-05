const parameters = {
  /**
   * Represents the site's address.
   */
  address: 'https://omikuji.azure.icu',

  /**
   * Represents hashtags for use of copying and tweeting.
   */
  hashtags: ['伊予みくじ', '御神籤処'],
}

// NOTE: for injecting functions using internal properties
export const constants = {
  ...parameters,

  /**
   * Gets hashtags by mapped, stringified style
   */
  getHashtags: (): string => {
    return parameters.hashtags
      .map(hashtag => `#${hashtag}`)
      .join(' ')
  }
}