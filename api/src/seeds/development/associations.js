/**
 * Created by dionis on 6/26/2016.
 */
/*associations: {
  [
    {
      alias: "formations",
      type: 'collection',
      collection: 'formation',
      via: 'formationCenter'
     }

  ]
};*/
associations: {
  [
    { alias: 'hasOneGroup',
      type: 'model',
      model: 'group' },
    { alias: 'hasManyGroups',
      type: 'collection',
      collection: 'group',
      via: 'hasOneUser' },
    { alias: 'manyManyGroups',
      type: 'collection',
      collection: 'group',
      via: 'manyManyUsers' }
  ]
};
