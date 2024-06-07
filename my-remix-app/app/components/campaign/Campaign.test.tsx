import { render, screen } from '@testing-library/react';
import Campaign from './Campaign';
import { debug } from "jest-preview";
import "@testing-library/jest-dom";

describe('Campaign component', () => {
  it('should render the title correctly', () => {
    render(<Campaign />);
    
    debug();

    const title = screen.getByText('Ürünler');
    expect(title).toBeInTheDocument();
  });

 

});
