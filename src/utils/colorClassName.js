export function colorClassName(color) {
    switch (color) {
      case 'red':
        return 'text-red-500';
      case 'green':
        return 'text-green-500';
      case 'blue':
        return 'text-blue-500';
      case 'yellow':
        return 'text-yellow-500';
      default:
        return 'text-black';
    }
  }
  