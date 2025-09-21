function isAnagram(str1, str2) {
  // Check if the lengths of the strings are equal
  if (str1.length !== str2.length) {
      return false;
  }

  let string1 = str1.toLowerCase().split('').sort().join('');
  let string2 = str2.toLowerCase().split('').sort().join('');
   
  if(string1 === string2)
    return true;
  else
    return false;
}

module.exports = isAnagram;
