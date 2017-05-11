
exports.seed = function(knex, Promise) {

  const text1 = [
    "The Rock Dove Collective is a radical community health exchange working to address the need for accessible and anti-oppressive health care in our communities. We coordinate a network of health practitioners who provide physical, mental, sexual, emotional, social and spiritual care from a progressive perspective on well-being. We are a collective of anarchist and radical individuals who support de-centralized and non-oppressive forms and sources of health, we see this as both a daily necessity and a revolutionary strategy."
  ].join("\n")

  const text2 = [
    "Esteban Kelly is a visionary leader and compassionate strategist who inspires organizers by drawing on science fiction, social theory, and collective liberation. Uniting close friends and long-time co-organizers, Esteban was inspired to co-create AORTA (Anit-Opression Resource and Training Alliance) culling together his creative energy and organizational skills for expanding food sovereignty, solidarity economy & cooperative business, gender justice & queer liberation, and movements for racial justice."
  ].join("\n\n")

  const text3 = [
    "While, this is not a final statement on reparations, I hope that it will spark further thinking and discussion as we continue to build power and work for what is needed."
  ].join("\n\n")

  return knex('comments').del()
    .then(() => knex('posts').del())
    .then(function () {
      return Promise.all([
        createPost(
          'The Rock Dove Collective',
          text1,
          'Autumn Brown',
          'http://aorta.coop/sites/default/files/imagecache/trainer_about_image/fullsizerender.jpg',
          new Date()
        ),
        createPost(
          'AORTA and Esteban',
          text2,
          'AORTA cooperative',
          'http://aorta.coop/sites/default/files/imagecache/trainer_about_image/dsc_03111_0.jpg',
          new Date(2017, 02, 11)
        ),
        createPost(
          "REPARATIONS: HOW ARE WE DOING IT?",
          text3,
          'Ed Whitfeild',
          'https://images.pexels.com/photos/4787/feet-hipster-longboard-skateboard.jpg?h=350&auto=compress',
          new Date(2016, 09, 27)
        ),
      ])
    })
    .then(function (postIds) {
      return Promise.all([
        knex('comments').insert({post_id: postIds[0], content: 'check out Autumn\'s publication Octavia’s Brood: Science Fiction Stories from Social Justice Movements (AK Press, 2015)'}),
        knex('comments').insert({post_id: postIds[1], content: 'check out the USFWC too'}),
        knex('comments').insert({post_id: postIds[2], content: 'Resistance, Advocacy and Doing things for ourselves (RAD)'}),
      ])
    })

  function createPost(title, body, author, image_url, created_at) {
    return knex('posts')
      .insert({title, body, author, image_url, created_at})
      .returning('id')
      .then(ids => ids[0])
  }
};
