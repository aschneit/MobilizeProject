import { render, waitFor, within } from '@testing-library/react';
import App from './App';

const data = [
  {
    title: "testTitle1",
    description: "testDescription1"
  },
  {
    title: "testTitle2",
    description: "testDescription2"
  }
];

it('should render list item for every event', async () => {
  const mockApiCall = jest.spyOn(global, "fetch").mockImplementation(() =>
   Promise.resolve({
     json: () => Promise.resolve({ data })
   })
  );

  const { findAllByTestId} = render(<App />);

  await waitFor(() => {
    expect(mockApiCall).toHaveBeenCalledTimes(1)
  })

  const listItems = await findAllByTestId("event-list-item");

  expect(listItems).toHaveLength(2);

  listItems.forEach((item, index) => {
    const { getByText } = within(item);
    expect(getByText(data[index].title)).toBeInTheDocument();
    expect(getByText(data[index].description)).toBeInTheDocument();
  })
});

it('should render different view when button is toggled', async () => {
  const mockApiCall = jest.spyOn(global, "fetch").mockImplementation(() =>
   Promise.resolve({
     json: () => Promise.resolve({ data })
   })
  );
  const { findAllByTestId, getByTestId, queryAllByTestId } = render(<App />);

  await waitFor(() => {
    expect(mockApiCall).toHaveBeenCalledTimes(1)
  })

  const listItems = await findAllByTestId("event-list-item");

  expect(listItems).toHaveLength(2);

  listItems.forEach((item, index) => {
    const { getByText } = within(item);
    expect(getByText(data[index].title)).toBeInTheDocument();
    expect(getByText(data[index].description)).toBeInTheDocument();
  });

  const button = getByTestId("map-view-button");
  button.click();
  const listItems2 = queryAllByTestId("event-list-item");
  expect(listItems2).toEqual([]);
})
