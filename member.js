function skillsMember() {
  // This is a private variable
  var skills = ['JavaScript', 'HTML', 'CSS'];

  return {
    getSkills: function() {
      return skills;
    },
    addSkill: function(skill) {
      skills.push(skill);
    }
  };
}