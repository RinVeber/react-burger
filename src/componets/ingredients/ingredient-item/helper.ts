export const currentRow = (box: EventTarget & HTMLDivElement) => {
    const boxRect = box.getBoundingClientRect();
    const buns = box.querySelector(`#bun`);
    const sauces = box.querySelector(`#sauce`);
    const mains = box.querySelector(`#main`);
    const rows = [buns, sauces, mains];
    const newRow = rows.find((row) => {
      const rowRect = row!.getBoundingClientRect();
      return (rowRect.y - boxRect.y >= -30) && (rowRect.y - boxRect.y < 100);
    });
    return newRow ? newRow.id : null;
  };