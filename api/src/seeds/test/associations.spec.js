/**
 * Created by dionis on 6/26/2016.
 */
associations: {
  [
    {
      alias: "hasManyPlace",
      type: 'collection',
      collection: 'place',
      via: 'formationCenter'
     }

  ]
};
